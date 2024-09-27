<template>
    <div class="container mt-5">
        <h2>{{ isEdit ? "Modifier" : "Ajouter" }} un étudiant</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input
                    type="text"
                    v-model="etudiant.nom"
                    class="form-control"
                    id="nom"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input
                    type="text"
                    v-model="etudiant.prenom"
                    class="form-control"
                    id="prenom"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="annee" class="form-label">Année Académique</label>
                <input
                    type="number"
                    v-model="etudiant.id_annee_academique"
                    class="form-control"
                    id="annee"
                />
            </div>
            <div class="mb-3">
                <label for="cours" class="form-label">ID Cours</label>
                <input
                    type="number"
                    v-model="etudiant.id_cours"
                    class="form-control"
                    id="cours"
                />
            </div>
            <button type="submit" class="btn btn-primary">
                {{ isEdit ? "Mettre à jour" : "Ajouter" }}
            </button>
        </form>
    </div>
</template>

<script setup>
import router from "@/router";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    id: Number,
});

const route = useRoute();

const etudiantInitial = ref({
    nom: "",
    prenom: "",
    id_annee_academique: "",
    id_cours: "",
});
const isEdit = ref(false);

const etudiant = computed(() => {
    return etudiantInitial.value;
});

const submitForm = async () => {
    const url = isEdit.value
        ? `${import.meta.env.VITE_API_URL}/etudiant.php?id=${
              etudiantInitial.value.id
          }`
        : `${import.meta.env.VITE_API_URL}/etudiant.php`;

    const method = isEdit.value ? "PUT" : "POST";

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(etudiant.value),
        });
        router.push("/etudiants");
    } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire:", error);
    }
};

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/etudiant.php?id=${route.params.id}`)
        .then(async (r) => {
            if (r.ok) {
                return r.json();
            }
        })
        .then((data) => {
            etudiantInitial.value = data;
            isEdit.value = true;
        })
        .catch((e) => {
            console.log(
                "Erreur lors de la récupération des infos sur l'étudiant :",
                e
            );
        });
});
</script>
