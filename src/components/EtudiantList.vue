<template>
    <div class="container mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <h2 class="mb-4">Liste des étudiants</h2>
            <router-link to="/etudiants/nouveau" class="btn btn-success mb-3"
                >Ajouter un étudiant</router-link
            >
        </div>
        <table class="table table-striped" v-if="etudiantsList.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Année Académique</th>
                    <th>Cours</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="etudiant in etudiantsList" :key="etudiant.id">
                    <td>{{ etudiant.id }}</td>
                    <td>{{ etudiant.nom }}</td>
                    <td>{{ etudiant.prenom }}</td>
                    <td>{{ etudiant.annee_academique || "Non assignée" }}</td>
                    <td>{{ etudiant.nom_cours || "Non assigné" }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'EditEtudiant',
                                params: { id: etudiant.id },
                            }"
                            class="btn btn-primary btn-sm me-2"
                            >Modifier</router-link
                        >
                        <button
                            @click="deleteEtudiant(etudiant.id)"
                            class="btn btn-danger btn-sm"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center align-items-center" v-else>
            <div
                class="spinner-border text-success spinner-border-lg"
                role="status"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const etudiantsList = ref([]);

// Fonction pour récupérer la liste des étudiants
const getEtudiants = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/etudiant.php`
        );
        const data = await response.json();
        etudiantsList.value = data;
    } catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
    }
};

// Fonction pour supprimer un étudiant
const deleteEtudiant = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/etudiant.php?id=${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                // Mise à jour de la liste après suppression
                etudiantsList.value = etudiantsList.value.filter(
                    (etudiant) => etudiant.id !== id
                );
                alert("Étudiant supprimé avec succès");
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de l'étudiant :",
                error
            );
        }
    }
};

// Appel de la fonction pour récupérer les étudiants lors du montage du composant
onMounted(() => {
    getEtudiants();
});
</script>
