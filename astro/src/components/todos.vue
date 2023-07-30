<script setup>
  import { ref } from "vue";
  import { updateTodo, removeTodo, addTodo } from "../composables/todos";
  const { data } = defineProps({
    data: {
      type: Array,
      required: true,
    },
  });

  const todos = ref(data);

  const loading = ref(false);
  const newTodo = ref("");

  const updateTodos = (id) => {
    todos.value = updateTodo(todos.value, id);
  };
  const removeTodos = async (id) => {
    loading.value = true;
    todos.value = await removeTodo(todos.value, id);
    loading.value = false;
  };
  const addTodos = async () => {
    loading.value = true;
    todos.value = await addTodo(todos.value, newTodo.value);
    newTodo.value = "";
    loading.value = false;
  };
</script>

<template>
  <section class="page">
    <h1>Basic ToDo</h1>
    <p>(Astro + Vue3 - Edge Render)</p>
    <br />
    <div class="container">
      <Transition name="fade">
        <div v-if="loading" class="loading">Loading...</div>
      </Transition>
      <template v-if="!loading">
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            <button @click="updateTodos(todo.id)" class="done">
              <svg
                v-if="todo.done"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            </button>
            {{ todo.title }}
            <button @click="removeTodos(todo.id)" class="remove">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                />
              </svg>
            </button>
          </li>
        </ul>
        <form @submit.prevent="addTodos">
          <div>
            <label for="addNew">Add New Item:</label>
            <input type="text" v-model="newTodo" id="addNew" />
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
              />
            </svg>
            Add
          </button>
        </form>
      </template>
    </div>
  </section>
</template>

<style lang="scss">
  .page {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    border: 5px solid black;
    width: 60ch;

    .container {
      position: relative;
      min-height: 10rem;

      .loading {
        position: absolute;
        width: calc(100% + 1rem);
        height: calc(100% + 1rem);
        display: flex;
        top: -0.5rem;
        left: -0.5rem;
        background: rgba(222, 222, 222, 0.85);
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-radius: 0.2rem;
        text-transform: uppercase;
        font-weight: bold;
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter-from,
      .fade-leave-to {
        opacity: 0;
      }

      ul {
        li {
          display: flex;
          margin-top: 0.5rem;
          padding-top: 0.5rem;

          font-weight: bold;

          .done,
          .remove {
            border: 1px solid black;
            padding: 0.2rem;
            border-radius: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            transform: 300ms;

            &:hover {
              transform: scale(1.1);
            }
          }

          .done {
            margin-right: 0.5rem;
          }
          .remove {
            margin-left: auto;
            background-color: #dedede;
          }

          + li {
            border-top: 1px solid black;
          }
        }
      }

      form {
        margin-top: 2rem;
        width: 100%;
        display: flex;
        align-items: flex-end;

        div {
          flex-grow: 1;
          display: flex;
          flex-direction: column;

          label {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
          }
          input {
            border: 1px solid black;
            padding: 0.2rem;
            border-radius: 0.2rem;
          }
        }

        button {
          margin-left: 0.5rem;
          border: 1px solid black;
          background-color: #dedede;
          padding: 0.2rem;
          border-radius: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 1.5rem;
          transform: 300ms;
          padding: 0.25rem;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
</style>
