<template>
    <div class="container mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <h2 class="mb-4">Liste des cours</h2>
            <router-link to="/cours/nouveau" class="btn btn-success mb-3"
                >Ajouter un cours</router-link
            >
        </div>
        <table class="table table-striped" v-if="coursList.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom du cours</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cours, index) in coursList" :key="cours.id">
                    <td>{{ cours.id }}</td>
                    <td>{{ cours.nom }}</td>
                    <td>{{ visibleDescriptions[index] }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'EditCours',
                                params: { id: cours.id },
                            }"
                            class="btn btn-primary btn-sm me-2"
                            >Modifier</router-link
                        >
                        <button
                            @click="deleteCours(cours.id)"
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
import { computed, onMounted, ref } from "vue";

const coursList = ref([]);

const visibleDescriptions = computed(() =>
    coursList.value.map((c) => {
        const limit = 45;
        if (c.description.length > limit)
            return c.description.substring(0, limit) + "...";
        else return c.description;
    })
);

const getCours = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/cours.php`
        );
        const data = await response.json();
        console.log(data);
        coursList.value = data;
    } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
    }
};

const deleteCours = (id) => {
    try {
        fetch(`${import.meta.env.VITE_API_URL}/cours.php`, {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
        }).then(async (response) => {
            if (response.ok) {
                console.log(await response.json());
                coursList.value = coursList.value.filter((c) => c.id !== id);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la supprésion du cours:", error);
    }
};

onMounted(() => {
    getCours();
});
</script>
