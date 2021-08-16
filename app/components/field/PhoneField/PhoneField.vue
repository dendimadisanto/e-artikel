<template>
    <text-field v-bind="textField" class="rounded-lg" @input="input($event)" @keydown="keydown($event)">
        <template #label="{ label, required, error }">
            <slot name="label" v-bind="{ label, required, error }" />
        </template>
    </text-field>
</template>

<script src="./PhoneField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <phone-field label="Text" />
    ```

    Tampilan required
    ```vue
    <phone-field label="Text" required />
    ```

    Tampilan tanpa label
    ```vue
    <phone-field />
    ```
</docs>
