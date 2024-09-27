<template>
  <div class="container mt-5">
    <h2>{{ isEdit ? "Modifier" : "Ajouter" }} une année académique</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="annee" class="form-label">Année</label>
        <input
          type="text"
          v-model="anneeAcademique.annee"
          class="form-control"
          id="annee"
          required
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
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const anneeAcademiqueInitial = ref({ annee: "" });
const isEdit = ref(false);

const anneeAcademique = computed(() => anneeAcademiqueInitial.value);

const route = useRoute();

const submitForm = async () => {
  const url = isEdit.value
    ? `${import.meta.env.VITE_API_URL}/annee-academique.php?id=${
        anneeAcademiqueInitial.value.id
      }`
    : `${import.meta.env.VITE_API_URL}/annee-academique.php`;
  const method = isEdit.value ? "PUT" : "POST";

  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anneeAcademique.value),
    });
    router.push("/annees-academiques");
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error);
  }
};

onMounted(() => {
  try {
    fetch(
      `${import.meta.env.VITE_API_URL}/annee-academique.php?id=${
        route.params.id
      }`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.message && data.message !== "Année académique non trouvée.") {
          anneeAcademiqueInitial.value = data;
          isEdit.value = true;
        }
      });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'année académique :",
      error
    );
  }
});
</script>
