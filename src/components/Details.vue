<script lang="ts">
/**
 * renders a list of lectures as formatted JSON
 * @prop {Lecture[]} lectures - the lectures to render
 */
export default {};
</script>

<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();

// const isObject = (val: any) => val && typeof val === "object";
</script>

<template>
  <div v-if="lectures.length === 0">Load a html file to show details</div>

  <div v-else>
    <div class="collapse-arrow collapse">
      <input type="checkbox" />
      <div class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
        Details
      </div>
      <div class="collapse-content">
        <div v-for="lecture in lectures">
          <div class="collapse-arrow bg-base-100 border-base-300 collapse my-2 border">
            <input type="checkbox" />
            <div class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
              {{ lecture.id }}
            </div>
            <div class="collapse-content text-sm">
              <h3 class="mb-2">Lecture Details</h3>
              <ul>
                <li v-for="(value, key) in lecture" :key="key">
                  <!-- <template v-if="isObject(value)"> -->
                  <template v-if="typeof value === 'object'">
                    <strong>{{ key }}:</strong>
                    <ul>
                      <li v-for="(subValue, subKey) in value" :key="subKey">
                        {{ subKey }}: {{ subValue }}
                      </li>
                    </ul>
                  </template>

                  <template v-else>
                    <strong>{{ key }}:</strong> {{ value }}
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
