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

  <!-- <div v-else>
    <div class="collapse-arrow bg-base-200 collapse">
      <input type="checkbox" />
      <div class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
        Details
      </div>
      <div class="collapse-content">
        <div v-for="lecture in lectures">
          <div class="collapse-arrow bg-base-200 collapse my-2 border border-none">
            <input type="checkbox" />
            <div class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
              {{ lecture.id }}
            </div>
            <div class="collapse-content text-sm">
              <ul>
                <li v-for="(value, key) in lecture" :key="key">
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
  </div> -->
  <div v-else>
    <details
      name="accordion-group-1"
      class="collapse-arrow bg-base-200 border-base-100 collapse border"
    >
      <summary class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
        Details
      </summary>
      <div class="collapse-content">
        <div v-for="lecture in lectures">
          <details name="accordion-group-2" class="collapse-arrow bg-base-200 collapse">
            <summary class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
              {{ lecture.id }}
            </summary>
            <div class="collapse-content text-sm">
              <ul>
                <li v-for="(value, key) in lecture" :key="key">
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
          </details>
        </div>
      </div>
    </details>
  </div>
</template>
