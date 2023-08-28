<template>
  <!--  -->
  <div class="container mx-auto py-10">
    <p v-if="loading">Loading...</p>

    <p v-if="error">Something went wrong...</p>

    <div v-if="result && result.users.length > 0">
      <div
        class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
      >
        <div class="p-4" v-for="user in result.users" :key="user.id">
          <router-link :to="/user/ + user.id">
            <div class="relative">
              <div
                class="divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
              >
                <div class="flex items-center p-4">
                  <RandomImageGenerator
                    class="h-10 w-10 flex-none rounded-full"
                  />

                  <div class="ml-4 flex-auto">
                    <div class="capitalize font-bold">
                      {{ user.name }}
                    </div>
                    <div class="mt-1 text-slate-700">{{ user.email }}</div>
                  </div>

                  <!--  -->
                  <div
                    class="pointer-events-auto ml-4 flex-none rounded-md px-2 py-[0.3125rem] font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
                  >
                    View
                  </div>
                  <!--  -->
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- Render when there are no results -->

    <div v-else>
      <div class="text-center">
        <p class="text-gray-600 text-lg mb-4">
          No users available at the moment.
        </p>
        <router-link to="/add-user">
          <button
            class="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
          >
            Add a New User
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { USER_QUERY } from '@/graphql/queries';

import RandomImageGenerator from '@/components/RandomImageGenerator.vue';
import { onMounted } from 'vue';
export default {
  name: 'App',
  components: {
    RandomImageGenerator,
  },
  setup() {
    const { result, loading, error } = useQuery(USER_QUERY);
    console.log('getting users', result);

    onMounted(async () => {
      // Fetch the data when the component is mounted
      result;
    });
    return {
      result,
      loading,
      error,
    };
  },
};
</script>
