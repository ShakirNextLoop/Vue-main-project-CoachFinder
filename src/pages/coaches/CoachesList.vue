<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button link to="/auth" v-if="!isLoggedIn">Login</base-button>
        <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
      </div>
      <div v-if="isLoading">
          <base-spinner>
          </base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseSpinner,
  },
  data() {
    return {
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
      isLoggedIn(){
          return this.$store.getters.isAuthenticated
      },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) =>
        coach.areas.reduce((acc, area) => {
          return acc || this.activeFilters[area];
        }, false)
      );
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>