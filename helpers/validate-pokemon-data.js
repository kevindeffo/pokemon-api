"use strict";

const { Trainer, Type, Ability } = require('../models');

/**
 * Validates the existence of trainerId and typeId in the database.
 * @param {number} trainerId - The ID of the trainer to validate.
 * @param {number} typeId - The ID of the type to validate.
 * @returns {Promise<boolean>} - Returns true if both IDs are valid, otherwise false.
 */
async function validateTrainerAndType(trainerId, typeId) {
    try {
        const trainerExists = await Trainer.findByPk(trainerId);
        const typeExists = await Type.findByPk(typeId);
        return !!trainerExists && !!typeExists;
    } catch (error) {
        console.error('Error validating trainerId or typeId:', error);
        return false;
    }
}

/**
 * Validates the abilities field by checking each ability ID against the Ability table.
 * @param {Array<number>} abilities - An array of ability IDs to validate.
 * @returns {Promise<boolean>} - Returns true if all abilities are valid, otherwise false.
 */
async function validateAbilities(abilities) {
    try {
        const abilityChecks = await Promise.all(abilities.map(id => Ability.findByPk(id)));
        return abilityChecks.every(ability => !!ability);
    } catch (error) {
        console.error('Error validating abilities:', error);
        return false;
    }
}

module.exports = {
    validateTrainerAndType,
    validateAbilities
};