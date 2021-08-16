<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot name="label" v-bind="{ label, required, error: error || !!errorMessages }">
                <div class="mt-2">
                    <label :class="{ 'error--text': error || !!errorMessages }">{{ label }}</label>
                    <v-tooltip v-if="required" right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                x-small
                                color="red"
                                v-on="on"
                            >
                                <v-icon x-small>
                                    mdi-asterisk
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Wajib diisi.</span>
                    </v-tooltip>
                </div>
            </slot>
        </template>

        <v-select
            ref="selectField"
            v-bind="vSelect"
            color="#3368AC"
            :style="{'leter-spacing': '.025rem', 'font-size': '.75rem'}"
            class="rounded-lg"
            @input="input($event)"
            @update:error="(e) => error = e"
            @blur="blur($event)"
        />
    </field-container>
</template>

<script src="./SelectField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <select-field label="Select" />
    ```

    Tampilan required
    ```vue
    <select-field label="Select" required />
    ```

    Tampilan tanpa label
    ```vue
    <select-field />
    ```
</docs>
