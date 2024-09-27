<template>
    <div class="container mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <h2 class="mb-4">Liste des années académiques</h2>
            <router-link
                to="/annees-academiques/nouveau"
                class="btn btn-success mb-3"
                >Ajouter une année académique</router-link
            >
        </div>
        <table class="table table-striped" v-if="annees.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Année académique</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="annee in annees" :key="annee.id">
                    <td>{{ annee.id }}</td>
                    <td>{{ annee.annee }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'EditAnneeAcademique',
                                params: { id: annee.id },
                            }"
                            class="btn btn-primary btn-sm me-2"
                            >Modifier</router-link
                        >
                        <button
                            @click="deleteAnnee(annee.id)"
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
import { onMounted, ref } from "vue";

const annees = ref([]);

const getAnnees = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/annee-academique.php`
        );
        const data = await response.json();
        annees.value = data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des années académiques:",
            error
        );
    }
};

const deleteAnnee = (id) => {
    try {
        fetch(`${import.meta.env.VITE_API_URL}/annee-academique.php`, {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
        }).then((response) => {
            if (response.ok) {
                annees.value = annees.value.filter((a) => a.id !== id);
            } else {
                throw new Error(
                    "L'année n'a pas été supprimée pour une raison inconue !"
                );
            }
        });
    } catch (error) {
        console.error("Erreur lors de la supprésion du cours :", error);
    }
};

onMounted(() => {
    getAnnees();
});
</script>
