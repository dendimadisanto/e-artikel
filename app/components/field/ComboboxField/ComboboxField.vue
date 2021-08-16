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

        <v-combobox
            ref="comboboxField"
            v-bind="vCombobox"
            :multiple="multiple"
            :search-input.sync="search"
            :style="{
                'leter-spacing': '.025rem',
                'font-size': '.75rem'
            }"
            class="rounded-lg"
            @input="input($event)"
            @focus="icon = 'mdi-magnify'"
            @blur="blur($event)"
            @update:error="(e) => error = e"
            @update:search-input="updateSearch($event)"
        >
            <template #no-data>
                <v-list-item style="cursor: pointer">
                    <span class="caption mr-2">Tambahkan</span>
                    <v-chip color="primary caption lighten-3" label small>
                        {{ search }}
                    </v-chip>
                </v-list-item>
            </template>
        </v-combobox>
    </field-container>
</template>

<script src="./ComboboxField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <combobox-field label="Combobox" />
    ```

    Tampilan required
    ```vue
    <combobox-field label="Combobox" required />
    ```

    Tampilan tanpa label
    ```vue
    <combobox-field />
    ```
</docs>
