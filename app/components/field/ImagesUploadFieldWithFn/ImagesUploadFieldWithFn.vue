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

        <v-item-group v-model="selected">
            <v-row :justify="justifyCards">
                <v-item v-for="(item, index) in files" :key="index" class="mx-2 mb-2" #default="{ active }">
                    <v-slide-x-transition>
                        <v-card
                            class="portrait mx-2"
                            min-height="150"
                            width="150"
                            :color="active ? 'primary' : ''"
                            flat
                            outlined
                            @click="selected = index"
                        >
                            <v-img
                                class="upload-image-preview"
                                height="150"
                                :src="item.url"
                                :gradient="!active ? '217deg, rgba(0,0,0,.8), rgba(255,255,255,0) 30%' : ''"
                            >
                                <v-layout column justify-space-between fill-height class="white--text">
                                    <v-layout v-if="!active">
                                        <v-spacer />
                                        <v-btn icon outlined small color="white" class="ma-1">
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-spacer />
                                    <v-card-title class="title-gradient">
                                        <div class="caption text-truncate">
                                            {{ item.name ? item.name : null }}
                                        </div>
                                    </v-card-title>
                                </v-layout>
                            </v-img>
                            <v-overlay :value="active" z-index="2" absolute>
                                <client-only>
                                    <file-upload
                                        :input-id="Math.random().toString(36).substring(7)"
                                        class="v-btn v-btn--depressed v-btn--flat v-btn--icon v-btn--outlined v-btn--round theme--dark v-size--default"
                                        @input-file="update($event, index)"
                                    >
                                        <v-icon>mdi-camera</v-icon>
                                    </file-upload>
                                </client-only>
                                <v-btn
                                    icon
                                    outlined
                                    @click="remove(index)"
                                >
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </v-overlay>
                            <p v-if="sorting" class="text-center mt-2" :class="{ 'grey--text': !active, 'white--text': active }">
                                {{ index + 1 }}
                            </p>
                        </v-card>
                    </v-slide-x-transition>
                </v-item>

                <file-upload
                    ref="files"
                    v-model="files"
                    :input-id="Math.random().toString(36).substring(7)"
                    multiple
                    class="v-btn v-btn--contained text-capitalize theme--light elevation-0 v-size--default grey px-0 mx-2 square-uploads"
                    @input="input($event)"
                >
                    <v-icon color="white">
                        mdi-plus
                    </v-icon>
                </file-upload>
            </v-row>
        </v-item-group>
    </field-container>
</template>

<script src="./ImagesUploadFieldWithFn.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <images-upload-field-with-fn label="Images" />
    ```

    Tampilan required
    ```vue
    <images-upload-field-with-fn label="Images" required />
    ```

    Tampilan tanpa label
    ```vue
    <images-upload-field-with-fn />
    ```
</docs>
