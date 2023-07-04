import type { Inventory, OrientedPosition, BaseStats, Stats, Item } from '..';
import type { Level } from './Level';
import { fight } from './fight';
import { logs } from '$stores/logs';
import { store } from '$stores/store';
import { player } from '$stores/player';

export class Player {
    position: OrientedPosition;
    baseStats: BaseStats;
    stats: Stats;
    inventory: Inventory;
    xp: number;
    level: number;
    freeBaseStatsPoint: number;

    constructor(
        position: OrientedPosition,
        baseStats: BaseStats,
        stats: Stats,
        inventory: Inventory,
        xp = 0,
        level = 1,
        freeBaseStatsPoint = 0
    ) {
        this.position = position;
        this.baseStats = baseStats;
        this.stats = stats;
        this.inventory = inventory;
        this.xp = xp;
        this.level = level;
        this.freeBaseStatsPoint = freeBaseStatsPoint;
    }

    moveForward(level: Level) {
        const offsetX = Math.round(+Math.sin(this.position.t));
        const offsetY = Math.round(-Math.cos(this.position.t));

        if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
            return;
        }

        this.position.x += offsetX;
        this.position.y += offsetY;
    }

    moveBackward(level: Level) {
        const offsetX = Math.round(-Math.sin(this.position.t));
        const offsetY = Math.round(+Math.cos(this.position.t));

        if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
            return;
        }

        this.position.x += offsetX;
        this.position.y += offsetY;
    }

    moveLeft(level: Level) {
        const offsetX = Math.round(-Math.cos(this.position.t));
        const offsetY = Math.round(-Math.sin(this.position.t));

        if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
            return;
        }

        this.position.x += offsetX;
        this.position.y += offsetY;
    }

    moveRight(level: Level) {
        const offsetX = Math.round(+Math.cos(this.position.t));
        const offsetY = Math.round(+Math.sin(this.position.t));
        if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
            return;
        }

        this.position.x += offsetX;
        this.position.y += offsetY;
    }

    rotateLeft() {
        this.position.t -= Math.PI / 2;
    }

    rotateRight() {
        this.position.t += Math.PI / 2;
    }

    hasCollision(level: Level, x: number, y: number): boolean {
        if (level.collisionMap[x][y]) {
            return true;
        }

        let collide = false;
        level.scripts.forEach((script) => {
            if (script.collision && script.x == x && script.y == y) {
                collide = true;
            }
        });

        return collide;
    }

    attack(): void {
        const offsetX = Math.round(+Math.sin(this.position.t));
        const offsetY = Math.round(-Math.cos(this.position.t));

        store.update((store) => {
            const weapon = this.inventory.mainHand;

            if (!weapon) {
                return store;
            }

            if (Date.now() - weapon.lastAttackTimestamp < weapon.cooldown * 1e3) {
                return store;
            }

            weapon.lastAttackTimestamp = Date.now();

            const ai = store.levels[store.currentLevelNumber].getAiAt(
                this.position.x + offsetX,
                this.position.y + offsetY
            );

            if (!ai) {
                return store;
            }

            const newAiStats = fight(
                this.getStats(),
                ai.stats,
                () => {
                    logs.update((logs) => {
                        logs.push(`You missed a hit`);
                        return logs;
                    });
                },
                (damage) => {
                    logs.update((logs) => {
                        logs.push(`You hit for ${damage} dmg`);
                        return logs;
                    });
                    ai.color = 0xff0000;
                    store.screen.dirty = true;
                },
                () => {
                    logs.update((logs) => {
                        logs.push(`You killed a ${ai.name}`);
                        return logs;
                    });
                    player.update((player) => {
                        player = player.addXp(ai.xp);
                        return player;
                    });
                }
            );

            ai.stats = newAiStats;

            if (ai.stats.hp === 0) {
                store.levels[store.currentLevelNumber].removeAiAt(
                    this.position.x + offsetX,
                    this.position.y + offsetY
                );
            }

            return store;
        });
    }

    getNeededXp(): number {
        return 5 * this.level - 2;
    }

    addXp(xp: number): this {
        while (xp > 0) {
            const xpToNextLevel = this.getNeededXp() - this.xp;

            if (xpToNextLevel > xp) {
                this.xp += xp;
                xp = 0;
            } else {
                // XP overflow
                this.level++;
                this.freeBaseStatsPoint++;
                this.xp += xpToNextLevel;
                xp -= xpToNextLevel;
            }
        }

        this.xp += xp;
        return this;
    }

    getBaseStats(): BaseStats {
        return [this.inventory.mainHand, this.inventory.offHand, this.inventory.armor].reduce(
            function (stats, item: Item | null) {
                if (item) {
                    stats.strength += item.baseStats.strength;
                    stats.dexterity += item.baseStats.dexterity;
                    stats.intelligence += item.baseStats.intelligence;
                }

                return stats;
            },
            { ...this.baseStats }
        );
    }

    getStats(): Stats {
        return [this.inventory.mainHand, this.inventory.offHand, this.inventory.armor].reduce(
            function (stats, item: Item | null) {
                if (item) {
                    stats.hp += item.stats.hp;
                    stats.maxHp += item.stats.maxHp;
                    stats.ac += item.stats.ac;
                    stats.hit += item.stats.hit;
                    stats.pAttack += item.stats.pAttack;
                    stats.pDefense += item.stats.pDefense;
                }

                return stats;
            },
            { ...this.stats }
        );
    }

    equip(item: Item, itemIndex: number): Inventory {
        let oldItem = null;

        if (item.slot === 'none') {
            return this.inventory;
        }

        if (item.slot === 'mainHand') {
            oldItem = this.inventory.mainHand;
        }
        if (item.slot === 'offHand') {
            oldItem = this.inventory.offHand;
        }
        if (item.slot === 'armor') {
            oldItem = this.inventory.armor;
        }

        const inventory = {
            mainHand: item.slot === 'mainHand' ? item : this.inventory.mainHand,
            offHand: item.slot === 'offHand' ? item : this.inventory.offHand,
            armor: item.slot === 'armor' ? item : this.inventory.armor,
            bag: [...this.inventory.bag, oldItem].filter(Boolean) as Item[]
        };

        inventory.bag.splice(itemIndex, 1);

        return inventory;
    }

    unequip(item: Item): Inventory {
        const inventory = {
            mainHand: item.slot === 'mainHand' ? null : this.inventory.mainHand,
            offHand: item.slot === 'offHand' ? null : this.inventory.offHand,
            armor: item.slot === 'armor' ? null : this.inventory.armor,
            bag: [...this.inventory.bag, item]
        };

        return inventory;
    }
}
