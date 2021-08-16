<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot name="label" v-bind="{ label, required }">
                <div class="mt-2">
                    <label :class="{ 'error--text': errorMessages }">{{ label }}</label>
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

        <v-text-field
            v-bind="vTextField"
            @update:error="(e) => error = e"
            @click:clear="clear()"
        >
            <template #prepend>
                <client-only v-if="!readonly">
                    <file-upload
                        :input-id="Math.random().toString(36).substring(7)"
                        :multiple="false"
                        class="v-btn v-btn--contained v-btn--rounded text-capitalize theme--light elevation-0 v-size--default"
                        :class="color"
                        @input-file="input($event)"
                    >
                        <span class="v-btn__content">
                            Pilih File
                        </span>
                    </file-upload>
                </client-only>
                <v-btn v-else rounded elevation="0" color="grey" class="text-capitalize" disabled>
                    Pilih File
                </v-btn>
            </template>
        </v-text-field>
    </field-container>
</template>

<script src="./SingleUploadFieldAutoUpload.js"></script>

<style src="./SingleUploadFieldAutoUpload.scss" lang="scss" scoped></style>

<docs>
    Tampilan standard
    ```vue
    <single-upload-field-auto-upload label="File" />
    ```

    Tampilan required
    ```vue
    <single-upload-field-auto-upload label="File" required />
    ```

    Tampilan tanpa label
    ```vue
    <single-upload-field-auto-upload />
    ```
</docs>
