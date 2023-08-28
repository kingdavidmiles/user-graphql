<template>
  <div class="container mx-auto py-10">
    <h1>This is an single page</h1>

    <p v-if="loading">Loading...</p>

    <p v-if="error">Loading...</p>

    <div v-if="result">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <RandomImageGenerator :width="500" :height="300" />

        <div class="px-6 py-4">
          <div
            class="font-bold text-xl mb-2"
            contenteditable
            @blur="handleEditField('name', $event)"
          >
            {{ result.getUserById.name }}
          </div>
          <p
            class="text-gray-700 text-base"
            contenteditable
            @blur="handleEditField('email', $event)"
          >
            {{ result.getUserById.email }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <button
            class="inline-block bg-gray-200 text-red-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            @click="handleDeleteUser"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_USER } from '@/graphql/queries';
import { useMutation } from '@vue/apollo-composable';
import {
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from '@/graphql/mutations';

import Swal from 'sweetalert2';

import { useRoute, useRouter } from 'vue-router';

import RandomImageGenerator from '@/components/RandomImageGenerator.vue';
export default {
  name: 'single-user',
  components: {
    RandomImageGenerator,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = route.params.id;
    const { result, loading, error } = useQuery(GET_USER, {
      id: userId,
    });
    const { mutate: deleteUserMutation } = useMutation(DELETE_USER_MUTATION);
    const { mutate: updateUserMutation } = useMutation(UPDATE_USER_MUTATION);

    // udpate a user
    const handleEditField = async (field: string, event: FocusEvent) => {
      try {
        const updatedValue =
          (event.target as HTMLElement)?.textContent?.trim() || '';
        if (result.value.getUserById[field] !== updatedValue) {
          await updateUserMutation({
            input: { id: userId, [field]: updatedValue },
          });
          window.location.reload();
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    // delete a user
    const handleDeleteUser = async () => {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) {
        try {
          // Call the mutation to delete the user
          const response = await deleteUserMutation({
            deleteById: userId,
          });

          if (response?.data.deleteUser) {
            // Show SweetAlert success message
            Swal.fire({
              icon: 'success',
              title: 'User Deleted!',
              text: 'The user has been deleted.',
              showConfirmButton: false,
              timer: 1500,
            });
            router.push('/');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };
    return {
      result,
      loading,
      error,
      route,
      userId,
      handleDeleteUser,
      handleEditField,
    };
  },
};
</script>
