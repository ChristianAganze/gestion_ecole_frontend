<template>
    <div class="container mt-5">
        <h2>{{ isEdit ? "Modifier" : "Ajouter" }} un cours</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input
                    type="text"
                    v-model="cours.nom"
                    class="form-control"
                    id="nom"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                    v-model="cours.description"
                    class="form-control"
                    id="description"
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                {{ isEdit ? "Mettre à jour" : "Ajouter" }}
            </button>
        </form>
    </div>
</template>

<script setup>
import router from "@/router";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const coursInitial = ref({ nom: "", description: "" });
const isEdit = ref(false);

const route = useRoute();

const cours = computed(() => coursInitial.value);
const submitForm = async () => {
    const url = isEdit.value
        ? `${import.meta.env.VITE_API_URL}/cours.php?id=${
              coursInitial.value.id
          }`
        : `${import.meta.env.VITE_API_URL}/cours.php`;
    const method = isEdit.value ? "PUT" : "POST";

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cours.value),
        });
        router.push("/cours");
    } catch (error) {
        console.error("Erreur lors de la modifications du cours");
    }
};

onMounted(() => {
    try {
        fetch(`${import.meta.env.VITE_API_URL}/cours.php?id=${route.params.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.id && data.nom) {
                    coursInitial.value = data;
                    isEdit.value = true;
                }
            });
    } catch (error) {
        console.error("Erreur lors de la récupération du cours : ", error);
    }
});
</script>
