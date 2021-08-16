<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot
                name="label"
                v-bind="{ label, required, error: error || errors.length !== 0 }"
            >
                <div class="mt-2">
                    <label :class="{ 'error--text': error || errors.length }">{{
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

        <v-text-field
            ref="textField"
            :style="{
                'border-radius': '0px',
                'leter-spacing': '.025rem',
                'font-size': '.75rem'
            }"
            v-bind="vTextField"
            color="#3368AC"
            @update:error="e => (error = e)"
            @click:clear="clear()"
            @blur="blur($event)"
        >
            <template #prepend>
                <client-only v-if="!readonly">
                    <file-upload
                        :input-id="
                            Math.random()
                                .toString(36)
                                .substring(7)
                        "
                        :multiple="false"
                        class="v-btn v-btn--contained text-capitalize font-weight-regular theme--light elevation-0 v-size--default body-2"
                        :class="color"
                        @input-file="input($event)"
                    >
                        <span class="v-btn__content caption">
                            <v-icon>icon-13</v-icon> File
                        </span>
                    </file-upload>
                </client-only>
                <v-btn
                    v-else
                    tile
                    elevation="0"
                    color="grey"
                    class="text-capitalize"
                    disabled
                >
                    Pilih File
                </v-btn>
            </template>
        </v-text-field>
    </field-container>
</template>

<script src="./SingleUploadField.js"></script>

<style src="./SingleUploadField.scss" lang="scss" scoped></style>

<docs>
    Tampilan standard
    ```vue
    <single-upload-field label="File" />
    ```

    Tampilan required
    ```vue
    <single-upload-field label="File" required />
    ```

    Tampilan tanpa label
    ```vue
    <single-upload-field />
    ```
</docs>
