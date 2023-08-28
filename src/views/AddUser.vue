<template>
  <div class="container mx-auto py-20">
    <div class="rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-5 uppercase">Add new user</div>
        <!-- add user form -->
        <form class="w-full" @submit.prevent="addNewUser">
          <!-- user name -->
          <div class="mb-6">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full h-100 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Name"
              v-model="newUser.name"
              style="height: 3rem"
            />
          </div>
          <!-- user name -->
          <div class="mb-6">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              style="height: 3rem"
              type="text"
              placeholder="User Name"
              v-model="newUser.userName"
            />
          </div>
          <!--  -->

          <!-- email -->
          <div class="mb-6">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              style="height: 3rem"
              type="email"
              placeholder="email address"
              v-model="newUser.email"
            />
          </div>

          <!-- password -->
          <div class="mb-6">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              style="height: 3rem"
              type="text"
              placeholder=" password"
              v-model="newUser.password"
            />
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-full">
              <button
                class="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                create user
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ADD_USER_MUTATION } from '@/graphql/mutations';
import { useMutation } from '@vue/apollo-composable';
const { mutate: addUserMutation } = useMutation(ADD_USER_MUTATION);
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const newUser = ref({
  name: '',
  userName: '',
  email: '',
  password: '',
});

const addNewUser = async () => {
  try {
    const response = await addUserMutation({
      input: {
        name: newUser.value.name,
        userName: newUser.value.userName,
        email: newUser.value.email,
        password: newUser.value.password, // If password is required in your schema
      },
    });
    if (response) {
      // Show SweetAlert success message
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'user has been successfully added',
        showConfirmButton: false,
        timer: 1500,
      });
      // Navigate to the home page after success
      router.push('/');
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
