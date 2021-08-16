<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot
                name="label"
                v-bind="{ label, required, error: error || !!errorMessages }"
            >
                <div class="mt-2">
                    <label :class="{ 'error--text': error || !!errorMessages }">{{
                        label
                    }}</label>
                    <v-tooltip v-if="required" right>
                        <template v-slot:activator="{ on }">
                            <v-btn icon x-small color="red" v-on="on">
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
        <v-autocomplete
            ref="autocompleteField"
            v-bind="vAutocomplete"
            style="font-size: .75rem; leter-spacing: .025rem;"
            color="#3368AC"
            :clearable="clearable"
            clear-icon="icon-cross"
            :loading="loading"
            class="rounded-lg"
            @input="input($event)"
            @focus="icon = 'mdi-magnify'"
            @blur="blur($event)"
            @update:error="e => (error = e)"
        />
    </field-container>
</template>

<script src="./AutocompleteField.js"></script>

<style scoped>
</style>

<docs>
    Tampilan standard
    ```vue
    <autocomplete-field label="Autocomplete" />
    ```

    Tampilan required
    ```vue
    <autocomplete-field label="Autocomplete" required />
    ```

    Tampilan tanpa label
    ```vue
    <autocomplete-field />
    ```
</docs>
