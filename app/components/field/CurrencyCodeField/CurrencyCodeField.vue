<template>
    <select-field v-bind="selectField" @input="input($event)">
        <template #label="{ label, required, error }">
            <slot name="label" v-bind="{ label, required, error }" />
        </template>
    </select-field>
</template>

<script src="./CurrencyCodeField.js"></script>

<style scoped>

</style>
