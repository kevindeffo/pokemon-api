const { Team, Pokemon } = require('../db/sequelize');

module.exports = {
    createTeam: (req, res) => {
        Team.create(req.body)
            .then(team => {
                const message = "Une nouvelle équipe a été créée.";
                res.status(201).json({ message, data: team });
            })
            .catch(error => {
                const message = "L'équipe n'a pas pu être créée. Veuillez réessayer plus tard.";
                res.status(500).json({ message, data: error });
            });
    },
    getAllTeams: (req, res) => {
        Team.findAll({ include: ['pokemons'] })
            .then(teams => {
                const message = "Liste des équipes récupérée avec succès.";
                res.status(200).json({ message, data: teams });
            })
            .catch(error => {
                const message = "La liste des équipes n'a pas pu être récupérée. Veuillez réessayer plus tard.";
                res.status(500).json({ message, data: error });
            });
    },
    getTeamById: (req, res) => {
        Team.findByPk(req.params.id, { include: ['pokemons'] })
            .then(team => {
                if (!team) {
                    const message = "L'équipe demandée n'existe pas.";
                    return res.status(404).json({ message });
                }
                const message = "Équipe récupérée avec succès.";
                res.status(200).json({ message, data: team });
            })
            .catch(error => {
                const message = "L'équipe n'a pas pu être récupérée. Veuillez réessayer plus tard.";
                res.status(500).json({ message, data: error });
            });
    },
    updateTeam: (req, res) => {
        const id = req.params.id;
        Team.update(req.body, { where: { id } })
            .then(_ => {
                return Team.findByPk(id).then(team => {
                    if (!team) {
                        const message = "L'équipe demandée n'existe pas.";
                        return res.status(404).json({ message });
                    }
                    const message = "Équipe mise à jour avec succès.";
                    res.status(200).json({ message, data: team });
                });
            })
            .catch(error => {
                const message = "L'équipe n'a pas pu être mise à jour. Veuillez réessayer plus tard.";
                res.status(500).json({ message, data: error });
            });
    },
    deleteTeam: (req, res) => {
        Team.findByPk(req.params.id)
            .then(team => {
                if (!team) {
                    const message = "L'équipe demandée n'existe pas.";
                    return res.status(404).json({ message });
                }
                return Team.destroy({ where: { id: team.id } })
                    .then(_ => {
                        const message = "Équipe supprimée avec succès.";
                        res.status(200).json({ message, data: team });
                    });
            })
            .catch(error => {
                const message = "L'équipe n'a pas pu être supprimée. Veuillez réessayer plus tard.";
                res.status(500).json({ message, data: error });
            });
    }
};