<script setup lang="ts">
import FileInput from "./FileInput.vue";
</script>

<template>
    <!-- <div class="hero bg-base-200 min-h-screen"> -->
    <div class="hero bg-base-200 min-h-dvh">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">FlexNow Stats Visualizer</h1>
                <p class="py-6">
                    Use this tool to visualize the statistics of your own exams and compare yourself against
                    the others.
                </p>
            </div>
            <div class="card bg-base-100 max-w-sm shrink-0 shadow-2xl">
                <div class="card-body">
                    <FileInput />
                    <!-- <fieldset class="fieldset">
                        <label class="label">Email</label>
                        <input type="email" class="input" placeholder="Email" />
                        <label class="label">Password</label>
                        <input type="password" class="input" placeholder="Password" />
                        <div><a class="link link-hover">Forgot password?</a></div>
                        <button class="btn btn-neutral mt-4">Login</button>
                    </fieldset> -->
                </div>
            </div>
        </div>
    </div>
</template>
