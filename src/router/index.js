import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EtudiantList from "../components/EtudiantList.vue";
import EtudiantForm from "../components/EtudiantForm.vue";
import CoursList from "../components/CoursList.vue";
import CoursForm from "../components/CoursForm.vue";
import AnneeAcademiqueList from "../components/AnneeAcademiqueList.vue";
import AnneeAcademiqueForm from "../components/AnneeAcademiqueForm.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/etudiants",
        name: "Etudiants",
        component: EtudiantList,
    },
    {
        path: "/etudiants/nouveau",
        name: "NewEtudiant",
        component: EtudiantForm,
    },
    {
        path: "/etudiants/:id",
        name: "EditEtudiant",
        component: EtudiantForm,
        props: true,
    },
    {
        path: "/cours",
        name: "Cours",
        component: CoursList,
    },
    {
        path: "/cours/nouveau",
        name: "NewCours",
        component: CoursForm,
    },
    {
        path: "/cours/:id",
        name: "EditCours",
        component: CoursForm,
        props: true,
    },
    {
        path: "/annees-academiques",
        name: "AnneesAcademiques",
        component: AnneeAcademiqueList,
    },
    {
        path: "/annees-academiques/nouveau",
        name: "NewAnneeAcademique",
        component: AnneeAcademiqueForm,
    },
    {
        path: "/annees-academiques/:id",
        name: "EditAnneeAcademique",
        component: AnneeAcademiqueForm,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
