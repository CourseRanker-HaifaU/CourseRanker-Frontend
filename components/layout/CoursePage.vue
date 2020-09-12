<template>
  <div class="flex flex-col gap-y-10">
    <div class="container">
      <h2>מבוא למדעי המחשב</h2>
      <div style="margin-bottom: 18px">
        <hr class="border-0 bg-gray-500 text-gray-500 h-px" />
      </div>
      <div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-2">
        <div>
          <th>חוג:</th>
          <td>מדעי המחשב</td>
        </div>
        <div>
          <th>נקודות זכות:</th>
          <td>5</td>
        </div>
        <div>
          <th>אופן הוראה:</th>
          <td>שיעור ותרגול</td>
        </div>
        <div>
          <th>קהל יעד:</th>
          <td>חוג</td>
        </div>
        <div>
          <th>סוג קורס:</th>
          <td>חובה</td>
        </div>
        <div>
          <th>דירוג ממוצע:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>סימסטר א' תשפ"א</h1>
      <div class="grid gap-1 grid-cols-2 gap-y-3">
        <div>
          <th>מרצה:</th>
          <td>אור מאיר</td>
        </div>
        <div>
          <th>מתרגל/ת:</th>
          <td>דפנה קופל</td>
        </div>
        <div>
          <th>דירוג מרצה:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
        <div>
          <th>דירוג מתרגל/ת:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
        <div>
          <th>דירוג קורס:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
        <div>
          <th>דירוג קורס + מרצה:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
        <div>
          <th>דירוג קורס + מתרגל/ת:</th>
          <td>
            <rating :rating="5" class="rating"></rating>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  @apply text-3xl;
  @apply font-bold;
  @apply ml-6;
}
h1 {
  padding-bottom: 0.75rem;
  @apply text-xl;
  @apply font-bold;
  @apply ml-2;
}
td {
  padding-right: 0.5rem;
}
.rating {
  font-size: 6px;
}
</style>
