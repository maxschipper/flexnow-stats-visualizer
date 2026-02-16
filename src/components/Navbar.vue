<script setup lang="ts">
import { ref } from "vue";

import { MoonIcon, RotateCcwIcon, SunIcon } from "lucide-vue-next";

import { useLectures } from "@/composables/useLectures";
import Debug from "@/components/Debug.vue";
import Details from "@/components/Details.vue";

const { clearLectures } = useLectures();
const modalRef = ref<HTMLDialogElement | null>(null);

const openModal = () => modalRef.value?.showModal();
</script>

<template>
  <div class="navbar bg-base-100/95 top-0 gap-5 md:sticky md:z-50 md:mb-8 md:shadow-md">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">FlexNow Charts</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal items-center gap-0 px-1">
        <li>
          <!-- dark mode toggle -->
          <label class="swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="mydark" />

            <MoonIcon class="swap-off" />
            <SunIcon class="swap-on" />
          </label>
        </li>
        <li>
          <button class="btn btn-ghost" @click="openModal">Data</button>

          <Teleport to="body">
            <dialog ref="modalRef" class="modal modal-center">
              <div class="modal-box">
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
