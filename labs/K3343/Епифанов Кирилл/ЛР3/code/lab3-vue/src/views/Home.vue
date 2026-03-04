<template>
  <div class="container">
    <h2>Search</h2>

    <select v-model="typeFilter" id="typeFilter">
      <option value="">All types</option>
      <option value="apartment">Apartment</option>
      <option value="house">House</option>
    </select>

    <select v-model="locationFilter" id="locationFilter">
      <option value="">All locations</option>
      <option value="england">England</option>
      <option value="wales">Wales</option>
      <option value="scotland">Scotland</option>
    </select>

    <input type="number" id="maxPrice" v-model.number="maxPriceFilter" placeholder="Max price">

    <div class="grid">
      <PropertyCard v-for="item in filteredProperties" :key="item.id" :property="item" />
    </div>
  </div>
</template>

<script setup>
import PropertyCard from "@/components/PropertyCard.vue"
import usePropertiesStore from "@/stores/properties"
import { computed, onMounted, ref } from "vue"

const propertiesStore = usePropertiesStore()

const typeFilter = ref("")
const locationFilter = ref("")
const maxPriceFilter = ref(0)

onMounted(() => {
  propertiesStore.loadProperties()
})

const filteredProperties = computed(() => {
  return propertiesStore.properties.filter((item) => {
    return (
      (typeFilter.value === "" || item.type === typeFilter.value) &&
      (maxPriceFilter.value === 0 || item.price <= maxPriceFilter.value) &&
      (locationFilter.value === "" || item.location === locationFilter.value)
    )
  })
})
</script>