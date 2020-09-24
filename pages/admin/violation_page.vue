<template>
  <div class="h-cover w-full text-center">
    <panel-page-title title="דיווחים על תוכן פוגעני" back-button />
    <body class="antialiased font-sans bg-gray-200">
      <div class="container mx-auto px-32 sm:px-64">
        <div class="py-8">
          <div class="my-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative ml-4">
                <select
                  class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
              <div class="relative ml-4">
                <select
                  class="appearance-none h-full rounded-r border-t sm:rounded-r-none border-r border-l border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option>הכל</option>
                  <option>טופל</option>
                  <option>לא טופל</option>
                  <option>תלונת שווא</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="block relative">
              <span
                class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                  ></path>
                </svg>
              </span>
              <input
                placeholder="חפש משתמש"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              class="inline-block min-w-full shadow rounded-lg overflow-hidden"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="column-title">משתמש מדווח</th>
                    <th class="column-title">סוג משתמש</th>
                    <th class="column-title">נשלח בתאריך</th>
                    <th class="column-title">תגובה מדווחת</th>
                    <th class="column-title">סטטוס</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="row">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            אבי בניהו
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">מנהל</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">21/7/2020</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">
                        *תמצית תגובה עם קישור אליה*
                      </p>
                    </td>
                    <td class="row">
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">טופל</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="row">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            שימי שמיים
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">עורך תוכן</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">09/09/2020</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">
                        *תמצית תגובה עם קישור אליה*
                      </p>
                    </td>
                    <td class="row">
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">טופל</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="row">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            דנה כהן
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">משתמש</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">20/09/2020</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">
                        *תמצית תגובה עם קישור אליה*
                      </p>
                    </td>
                    <td class="row">
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">תלונת שווא</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="row">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            שמעון שמעוני
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">משתמש</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">09/08/2020</p>
                    </td>
                    <td class="row">
                      <p class="text-gray-900 whitespace-no-wrap">
                        *תמצית תגובה עם קישור אליה*
                      </p>
                    </td>
                    <td class="row">
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">לא טופל</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
              >
                <span class="text-xs xs:text-sm text-gray-900">
                  מראה 1 עד 4 דיווחים מתוך 50
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button class="nav-button rounded-l ml-2">קודם</button>
                  <button class="nav-button rounded-r">הבא</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<style scoped>
.column-title {
  @apply px-5;
  @apply py-3;
  @apply border-b-2;
  @apply border-gray-200;
  @apply bg-gray-100;
  @apply text-center;
  @apply text-xs;
  @apply font-semibold;
  @apply text-gray-600;
  @apply uppercase;
  @apply tracking-wider;
}

.row {
  @apply px-5;
  @apply py-5;
  @apply border-b;
  @apply border-gray-200;
  @apply bg-white;
  @apply text-sm;
}

.nav-button {
  @apply text-sm;
  @apply bg-gray-300;
  @apply text-gray-800;
  @apply font-semibold;
  @apply py-2;
  @apply px-4;
}

.nav-button:hover {
  @apply bg-secondary-hover;
}

tr:hover td {
  @apply bg-secondary-hover;
}
</style>
