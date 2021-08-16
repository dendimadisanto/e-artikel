<template>
    <text-field :tile="tile" v-bind="textField" @input="input($event)" @click="click($event)" @keydown="keydown($event)">
        <template #label="{ label, required, error }">
            <slot name="label" v-bind="{ label, required, error }" />
        </template>
    </text-field>
</template>

<script src="./NumberField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <number-field label="Text" />
    ```

    Tampilan required
    ```vue
    <number-field label="Text" required />
    ```

    Tampilan tanpa label
    ```vue
    <number-field />
    ```
</docs>
