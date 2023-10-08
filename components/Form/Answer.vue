<template>
    <draggable 
        class="list-group w-full mb-4" 
        :group="props.question.position"
        item-key="position" 
        v-model="props.question.answers" 
        v-bind="dragOptions" 
        @start="dragAnswer = true"
        @end="dragAnswerEnd" 
        handle=".answer-item-drag"
    >
        <transition-group 
            type="transition" 
            :name="dragAnswer ? 'answer-list' : null"
        >
            <div for="" v-for="(answer, indexA) in props.question.answers" :key="answer.position" class="flex items-center py-2 space-x-4 group list-group-item">
                <div class="min-w-max items-center flex">
                    <div class="w-[25px] answer-item-drag cursor-move">
                        <Icon name="i-uil-draggabledots" class="group-hover:!inline-block !hidden" size="25"/>
                    </div>
                    <div class="w-[30px]">
                        <Icon :name="`${props.question.type == 'radio' ? `i-ic-round-radio-button-unchecked` : `i-mdi-checkbox-blank-outline`}`" size="30"/>
                    </div>
                </div>
                <div class="flex-1">
                    <UInput placeholder="กรอกคำตอบ" v-model="answer.title" />
                </div>
                <div class="min-w-max flex space-x-2">
                    <UTooltip text="แทรกรูปภาพตัวเลือก">
                        <button @click="addImageAnswer" class="text-gray-600 flex items-center space-x-2 hover:bg-black/5 px-1">
                            <Icon name="i-ic-round-image" size="35" />
                        </button>
                    </UTooltip>
                    <UTooltip text="ลบตัวเลือก" v-if="props.question.answers.length > 1" >
                        <button class="hover:bg-black/5 text-gray-600 " type="button" @click="emits('deleteAnswer', { index: props.index, indexA})"> 
                            <Icon name="i-mdi-close" size="30"/> 
                        </button>
                    </UTooltip>
                </div>
            </div>
        </transition-group>
    </draggable>
    <button type="button" @click="emits('addAnswer', props.index )" class="mx-auto text-center block"><Icon name="material-symbols:add-circle-outline" size="30" /> เพิ่มตัวเลือก</button>
</template>


<script setup>
    const props = defineProps(['question', 'index'])
    const emits = defineEmits(['addAnswer', 'deleteAnswer'])

    const dragOptions = computed(() => {
      return {
        animation: 1,
        disabled: false,
        ghostClass: 'ghost',
      }
    })

    const dragAnswer = ref(false)
    const dragAnswerEnd = (e) => {
        dragAnswer.value = false
        console.log(newPosition.value);
    }

    const addImageAnswer = ( ) => {
        
    }

</script>

<style>
    .answer-list-move {
        transition: transform 0.5s;
    }
    
</style>