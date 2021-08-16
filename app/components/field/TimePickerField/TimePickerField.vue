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

        <v-menu
            v-model="display"
            v-bind="vMenu"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-if="!readonly || !disabled"
                    ref="textField"
                    v-bind="vTextField"
                    v-on="on"
                    @click:append="display = !display"
                    @update:error="(e) => error = e"
                    @click:clear="clear()"
                    @input="input($event)"
                    @blur="blur($event)"
                />
                <v-text-field
                    v-else
                    v-bind="vTextField"
                    @update:error="(e) => error = e"
                    @input="input($event)"
                />
            </template>
            <v-time-picker
                :key="value ? value : Math.random().toString(36).substring(7)"
                v-bind="vTimePicker"
                @input="timeSelected"
            />
        </v-menu>
    </field-container>
</template>

<script src="./TimePickerField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <time-picker-field label="Time" />
    ```

    Tampilan required
    ```vue
    <time-picker-field label="Time" required />
    ```

    Tampilan tanpa label
    ```vue
    <time-picker-field />
    ```
</docs>
