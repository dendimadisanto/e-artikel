<template>
    <field-container :md="md" :label-md="labelMd">
        <div class="mx-2 mt-2">
            <slot name="label" v-bind="{ label, required }">
                <label :class="{ 'error--text': errors.length }">{{ label }}</label>
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
            </slot>
        </div>

        <div v-if="file && file.url" :class="['pa-2', label ? 'pt-1' : 'pt-2']">
            <p v-if="errors.length" class="mb-1 error--text">
                {{ errors[0] }}
            </p>
            <v-fade-transition hide-on-leave>
                <v-img
                    v-if="file.url"
                    :src="file.url"
                    :gradient="!selected && loaded && !readonly ? 'to top, rgba(0,0,0,.9), rgba(255,255,255,0) 10%' : ''"
                    width="100%"
                    min-height="250px"
                    @load="loaded = true"
                >
                    <v-layout v-if="!selected && !readonly" column justify-space-between justify-center align-center fill-height>
                        <v-spacer />
                        <v-sheet color="transparent">
                            <v-btn icon outlined small color="white" class="my-1 mx-auto" @click="selected = !selected">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-layout>
                    <v-overlay :value="selected" z-index="2" absolute>
                        <file-upload
                            v-if="!readonly"
                            :input-id="Math.random().toString(36).substring(7)"
                            :class="editClass"
                            @input-file="input($event)"
                        >
                            <v-icon>mdi-camera</v-icon>
                        </file-upload>
                        <v-btn
                            v-if="!readonly"
                            icon
                            outlined
                            @click="clear()"
                        >
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                        <v-btn
                            v-if="!readonly"
                            icon
                            outlined
                            @click="selected = !selected"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-overlay>
                    <v-overlay absolute :value="!loaded">
                        <v-progress-circular
                            indeterminate
                            color="white"
                        />
                    </v-overlay>
                </v-img>
            </v-fade-transition>
        </div>
        <div v-else :class="['pa-2', label ? 'pt-1' : 'pt-2']">
            <v-fade-transition hide-on-leave>
                <client-only v-if="!readonly">
                    <file-upload
                        :input-id="Math.random().toString(36).substring(7)"
                        :multiple="false"
                        :class="buttonClass"
                        :style="{ 'height': '250px', 'border-color': '#9E9E9E !important' }"
                        @input-file="input($event)"
                    >
                        <div class="ma-auto">
                            <v-icon color="white">
                                mdi-camera-plus
                            </v-icon>
                            <p class="mb-1" :class="{ 'error--text': errors.length }">
                                {{ errors.length ? errors[0] : placeholder }}
                            </p>
                        </div>
                    </file-upload>
                </client-only>
                <v-card v-else flat disabled outlined height="250px" class="d-flex text-center" color="grey">
                    <div class="ma-auto">
                        <v-icon color="white">
                            mdi-camera-plus
                        </v-icon>
                        <p class="mb-1" :class="{ 'error--text': errors.length }">
                            {{ errors.length ? errors[0] : placeholder }}
                        </p>
                    </div>
                </v-card>
            </v-fade-transition>
        </div>
    </field-container>
</template>

<script src="./UploadAreaField.js"></script>

<style src="./UploadAreaField.scss" lang="scss" scoped></style>

<docs>
    Tampilan standard
    ```vue
    <upload-area-field label="Avatar" />
    ```
</docs>
