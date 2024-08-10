<script lang="ts" setup>


const tracksColumns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'release',
  label: 'Date of Release'
}, {
  key: 'duration',
  label: 'duration'
}, {
  key: 'explicit',
  label: 'explicit'
}]

const albumsColumns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'release',
  label: 'Date of Release'
}, {
  key: 'tracks',
  label: 'Number of tracks'
},]

const artist = ['Madona', 'Feid', 'Bad Bunny', 'Joji'];


const tracksTest = [{
  name: 'Classy 101',
  release: '2022',
  duration: '3:25',
  explicit: 'no'
}, {
  name: 'Ferxxo 101',
  release: '2022',
  duration: '3:25',
  explicit: 'no'
}]

const albumsTest = [{
  name: 'FELIZ CUMPLEAÑOS FERXXO',
  release: '2022',
  tracks: 10,
  image: 'https://i1.sndcdn.com/artworks-HovX7DXINUQX-0-t500x500.jpg'
}]


const items = [
  'https://i1.sndcdn.com/artworks-HovX7DXINUQX-0-t500x500.jpg',
  'https://phantom-elmundo.unidadeditorial.es/2d91a714120b2fdd1a8ba9fc82f61630/resize/1200/f/jpg/assets/multimedia/imagenes/2022/09/01/16620296387901.jpg',
  'https://i.ytimg.com/vi/cD5T1Y4b7wA/maxresdefault.jpg',
]

const input = ref('');

const albums = ref([]);

const tracks = ref([]);


const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 7000)
})

</script>



<template>
  <div>
    <UInputMenu v-model="input" :options="artist" />
    <UButton @click="console.log(input)">Seach</UButton>
    <h1>
      ARTIST: {{ input }}
    </h1>
    <h1>
      FOLLOWERS: 1000000
    </h1>
    <div>
      <UTable :columns="tracksColumns" :rows="tracksTest" />
    </div>
    <div>
      <UTable :columns="albumsColumns" :rows="albumsTest" />
    </div>

    <div>
      <h1>Images</h1>
      <UCarousel ref="carouselRef" v-slot="{ item }" :items="items" 
        class="rounded-lg overflow-hidden w-32 h-32" >
        <img :src="item" class="w-32 h-32" draggable="false">
      </UCarousel>

    </div>


  </div>
</template>
