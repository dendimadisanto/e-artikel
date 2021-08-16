<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot name="label" v-bind="{ label, required, error: error || !!errorMessagesAlamat || !!errorMessagesKota || !!errorMessagesProvinsi || !!errorMessagesNegara }">
                <div class="mt-2">
                    <label :class="{ 'error--text': error || !!errorMessagesAlamat || !!errorMessagesKota || !!errorMessagesProvinsi || !!errorMessagesNegara }">{{ label }}</label>
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

        <v-row no-gutters>
            <v-col v-if="alamatField" md="12" class="mb-2">
                <v-textarea
                    ref="alamatField"
                    v-bind="vTextarea"
                    @input="input($event, 'alamat')"
                    @update:error="(e) => error = e"
                    @blur="blur()"
                />
            </v-col>
            <v-col v-if="negaraField && !onlyAlamatField" md="3">
                <v-autocomplete
                    ref="selectNegara"
                    v-bind="vSelectNegara"
                    @input="input($event, 'negara')"
                    @update:error="(e) => error = e"
                    @blur="blur()"
                />
            </v-col>
            <v-spacer v-if="negaraField && !onlyAlamatField" />
            <v-col :md="negaraField ? 3 : 5">
                <v-autocomplete
                    v-if="!onlyAlamatField"
                    ref="selectProvinsi"
                    v-bind="vSelectProvinsi"
                    @input="input($event, 'provinsi')"
                    @update:error="(e) => error = e"
                    @blur="blur()"
                />
            </v-col>
            <v-spacer v-if="!onlyAlamatField" />
            <v-col :md="negaraField ? 3 : 5">
                <v-autocomplete
                    v-if="!onlyAlamatField"
                    ref="selectKota"
                    v-bind="vSelectKota"
                    @input="input($event, 'kota')"
                    @update:error="(e) => error = e"
                    @blur="blur()"
                />
            </v-col>
        </v-row>
    </field-container>
</template>

<script src="./AlamatField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <alamat-field label="Alamat" />
    ```

    Tampilan required
    ```vue
    <alamat-field label="Alamat" required />
    ```

    Tampilan tanpa label
    ```vue
    <alamat-field />
    ```
</docs>
