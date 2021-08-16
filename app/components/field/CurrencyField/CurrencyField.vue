<template>
    <number-field :tile="tile" v-bind="numberField" @input="input($event)" @keydown="keydown($event)">
        <template #label="{ label, required, error }">
            <slot name="label" v-bind="{ label, required, error }" />
        </template>
    </number-field>
</template>

<script src="./CurrencyField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <currency-field label="Text" />
    ```

    Tampilan required
    ```vue
    <currency-field label="Text" required />
    ```

    Tampilan tanpa label
    ```vue
    <currency-field />
    ```
</docs>
