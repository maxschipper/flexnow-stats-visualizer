<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { RotateCcwIcon } from "lucide-vue-next";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { ref } from "vue";

import Debug from "./Debug.vue";
import Details from "./Details.vue";
import { useLectures } from "@/composables/useLectures";

const { clearLectures } = useLectures();
const modalRef = ref<HTMLDialogElement | null>(null);

const openModal = () => modalRef.value?.showModal();
// const closeModal = () => modalRef.value?.close();

const isDark = useDark();
</script>
<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">StatsVisu</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <label class="swap swap-rotate">
            <!-- this hidden checkbox controls the state -->
            <input v-if="isDark" type="checkbox" class="theme-controller" value="mylight" />
            <input v-if="!isDark" type="checkbox" class="theme-controller" value="mydark" />

            <SunIcon class="swap-off h-8 w-8" />
            <MoonIcon class="swap-on h-8 w-8" />
          </label>
        </li>
        <li>
          <button class="btn btn-ghost" @click="openModal">Data</button>

          <Teleport to="body">
            <dialog ref="modalRef" class="modal modal-center">
              <div class="modal-box">
                <!-- <form method="dialog">
                  <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
                </form> -->
                <div class="flex flex-col gap-4">
                  <h3 class="font-semibold">Inspect your parsed data</h3>
                  <Details />
                  <Debug />
                </div>
                <div class="modal-action">
                  <form method="dialog">
                    <div class="flex gap-6">
                      <button
                        @click="clearLectures"
                        class="btn btn-warning flex justify-center gap-1"
                      >
                        <RotateCcwIcon :size="16" :stroke-width="2.5" /> Reset
                      </button>
                      <button class="btn btn-neutral">Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </Teleport>
        </li>
      </ul>
    </div>
  </div>
</template>
