<script setup lang="ts">
const cardConfig = { body: { base: '', background: '', padding: 'px-4 py-5 sm:p-6 w-full' } };
const { url, image, name, rank } = defineProps<{
    url: string,
    image?: string,
    name: string,
    rank: number,
}>();
const isOpen = ref(false);
const copy = async () => {
    navigator.clipboard.writeText(url);
}
const search = async (option: string, name: string) => {

    if (option === 'youtube') {
        window.open(`https://www.youtube.com/results?search_query=${name}`, '_blank');
    } else {
        window.open(`https://music.apple.com/search?term=${name}`, '_blank');
    }

}

</script>

<template>
    <UCard :ui="cardConfig" @click="isOpen = true"
        class="shadow-xl min-h-[108px] max-h-[108px] hover:scale-105 hover:bg-slate-100 hover:animate-pulse w-full h-fit flex flex-row gap-6">
        <div class="flex flex-row w-full h-full justify-between">
            <div class="flex flex-row gap-5">
                <img :src="image" :alt="name" width="50" class="mb-2 rounded-lg">
                <div class="flex flex-col gap-2 justify-center">
                    <h1 class="font-bold text-xl">{{ name }}</h1>
                </div>
            </div>
            <div class="flex items-center">
                <span></span>
            </div>
        </div>
    </UCard>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <Placeholder class="h-8" />
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-mono">
                        {{ name }}
                    </h1>
                    <UButton color="black" variant="ghost" @click="isOpen = false" icon="heroicons-solid:x" />
                </div>
            </template>

            <Placeholder class="h-32" />
            <div class="flex gap-4 mt-4">
                <UButton class="ml-12" label="Spotify" color="green" variant="ghost" :to="url" target="_blank">
                    <template #leading>
                        <UAvatar
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAbFBMVEUe12D///8A1VUZ114A1FAQ1lsA00v7/vz3/fnx/PTp+u4A0kXh+OcA1ljb9+LY9uC78MrA8c6T6KvG8tIq2GZV3n9D23TK89Y12WvQ9NqA5Jxw4ZGb6bFe34UA0T+p7Lto4Iux7sKJ5qN74pSQEQm3AAANdUlEQVR4nN2d55qiMBSGNYUeQEpAirT7v8dNsAwqgQRRXL9fu/uMLu+EJOfklOz2K0k3/BwigncKwgTtct/Q13qG3RpfoptWRW2NQBWSi4hmx5VlrgK0AozpNKWmKQ3JI49WNo75BTCOn+00spzkyhO1B2dbGP1YlQAtebueBBEoq+N2MHrYUvTyoPyJINqGr0ye5TCG36XohZkyJozS7LAcZzFMmEdq67AkDknz8MMwbh3hVabKsyCOaveTMB14F8oZB2Ufg6lO6H0kZyG7+QSM7lL73ShcNnWVVwJVGCtYewUTiaDCeiuMEcbrbJEygigOjffBWEEEPoXCBSK1wVGBSep37CxTwqRWsXAUYAr60WE5C9DqHTDdbkUzTF5kl68O49B3bpNTgpjKujqSMEn04dkyFI4kJ44cTPXpmf9AQ5rVYPRiWxZOU6wEYwRgo+kyoAGBxP45D2O227OwZQC088vALIyZvd1ElhJE8zRzMGb3HSxMKJt702Zg9PxrWBjN3PY5A1NvYMGINUczDdN9FQuz1Kbd6UmYbBNrbEKQtEthgq3MMbEgnto9J2Cq3cb7/pjwrlkCE6bf9pL1IjRRh3HjL5v8V4FSGC0QwXzRZvkokIlMAQGMUXzpuHCBQmAKCGB8/IWT/yoMDyow1paO5bxIOv6ijcN86+S/CpTyMIW29dPOSRs9gBqDcT5yMv6aTmMv2hhM+tUT5ixM5WCC/4CFLQIjRtozjPfdK9lVOH02BJ5gjPy/YGE03dPW+QTTRF9n948LR/4cjFV+pa08JlI/Bm8eYarvc8hEgvBxs3mA8eL/ZmDY0JTuFIxefa3hPyZUTcF4i/ZLKNbqz38nTF0xjKFglLEnxVy3R46iKL0qim4/9PBT60qrdCGMI7NfsqcjBEP25JTGdddWzeHoOZa5H3yvruum5bjJoanaro5jyvgg/9jKy8vDzjmE0ecGhj0PIFEal3kWNAfPkk2h0C330ARZXsY0ImDNvJv7oRnCWLuJ/wUDRNKYUVShuzSd0nTCJmjzmGIEFmWnPj/VnZs2hGnEA4MR7YrqsBjjDskNqyIrU4TA65bTXcLQEEY8YxCtjmtw3BH5Rf46EE7HYUKhT4Yyb1WSiwzLC6s8sl/K87QHkegBDBV9p0TMarF00zkWsW0vDjWSeAzGEg0MeDLoVgey/Bwt5bH/ftN/MK3gRAY+m9pvITpmRAMLtlbw53L+wYhWf5CtVngwJ7dlW6vqLgTxM8xBsKpAKJVPsJaSjEaKPPiWOnyDEXnLMF2cZrxMhp/FO5UFG3ePMCYVfBzTtyzLk7KqjiJpEwHT62HAFaYRmTJbwLDhSaoaS6aD/q1QV5hMNK6Yfvg1u8rx20guUxdfY9AXGDMWfQzuFPIK15V5LKhMkRGOzTuYQyoc0g8uzU8yLD+erzTC1zXqAjNxJLvZe3aWkcSnGZzb7nGGMfKJgAzoJE0zw7TOMtVyq+fkzuGATh/AuMIpw6WNJa7pumEYJjN7g6ykKbFPj9JwGtdZ0TBfjv2k/tK76tSTGymO3QGMP30mqwVDU5MPgOsXWZyik21rzGnEoxFQ7vQDpNn2CURlVhxcPmRLmbx8omAHpv4AZi62rMWhY+rcvHWPzKei5Mww/aGBMKfSCM2DxnMXFmUmnTjL4mJs9jBGNhfDJFocVE0V1CnQEFl4IgExQ0JR3VYKhyED+aXoiBK0xg3Gqed9PYy4VkijhYR9DRujKlR2kyxRKh+pnRtMIjLM3iZMEEjZECVqPqxZjr9CmB5vMP4mp+VsIkFaZo1K4aw3bn5C7N9gtjsuZwteRMtCmkdvxx/1fITOYUyRx/wRcd8yorJVP974ScU5h5vDWFP7/0fEtiREKxm7wRqf3qCzLjDT+/+nhNEpnm90YOaj8/tsA3CY47fEZNle3LrTW6o5viXi9HiBCbd+y/4EkRY3zsT7Zo5viRCEFxh/rbyfVSJmWEsD8X4qSh5DhzOMPnH6PyfIQzagNw4AN2yjXhCSy79xI1T9S9EurwS12kfBs6LmDGMUS7aZ3nZEzMwvuywoqqZpfN8/nMX+xP5eFUHWlXFKUG+VqowWBKAsxg5SdFEOPOKpjjv1bYb92jWNGSPMVzkkR9cRGva6wWOBxyRk/kKdEk1TMe0IidvnUrNE9HtHgXmGmbWZ/4SBZuOybZKeQTxPH9RTJU1b7mxb+kAMY9o9jI4pDCH1KbU7vmdKmmZQsykzpRa7WGykTMtvqWZLFntjHHVDS8ec8Ghy6wwjmS4DSLVOrxvD5REZKSCIUX57AaZSekl5gZFLMSH1GiA3ORXlq8L8KwdO9cHSTbeA2sQPX2EcKW9GkLD6igw/ozIxDKCdTid7+rAWx84ZRibHBOL3HAUeg5IqnfmLYKgCDHpblEY/Fh0lr5ZPKsHY74vRMp6k6FL5GMaYYCoPA+EbWbjMsCjJCy0tsALMaBrxutKdQwsXdxZTec3wu0eml+lUqb3scOUGI7M0v3XO/Em3wngRDo4v+4yM1zxeSfAWHrdckN9wswCkzBl74r/nMh3XO4a9BxAePdcx+39dxmPlytkAfV4wh5E4nOXoD0/Wm41OWAVdTHG/RzNpvdgf+pgGjfOgCV3LVDZNrSxS8+quhqYpV/R7Ps3pxQ36Q9WWkcasDLHjxb1QhDRb4xGNkKc+KiA5HVXB6dsFKDhnIG48y7SYX3IOBsi7WvysXENp3TahZ0l7QV5G5ffRq3Mm7TYTQPMsjwnzgpcENfg4sW8omsSRHKEki2RXtqvbrHCgwRNOX0oX5SEaheN/w5eNT1wPNNY7apIUZnYLrVtf5nj5IJk2fj1q2ocbBAEwIGncNfM8wVRK702QJPtNj2eZW7ZL62Zm/phSQ4NT7wLjfjxwdhVProf5dPOiWgrmdnC+cUiD2KSaWA4qKaf+FtLYNti049EMOxfmTfsycwDdgk0bhgFvAlrsj5/+S43MXxhwowDtg4hGi+MIjlR14iBAu0bo/FIoc9WSqAbWouCpP6Mw3/Luk4PQubO8BPBsTDJrE0aUxhdRSiPIbUwEgJLxi1HUHu5xCpl9ZpjUMJ9uMobRBwOiOG+LqvEPYXL0PPcszzsmzLVpKl5fEvU2qexAQZB2w57NodQ2M0w3mU0EehRBGrPr2yr0JiIa+8vpvxc2bR0hG8n5j5ik3W3nkbTNyCARaC5F6wHEBmVwUAkG9IGasKihrckA8cP/vh9Lksu1vrlP0fKkg+fgVFausSymoRtOk6OTRIUJZKZ5mu5knef75LnJtMahUP3yKY3Fe7yT2dVOJcwLLjnn8wmnd58StnxRkp5ktP/tr6OHhNOpVOCBSLywX/eIjm2c4pWq6K4dj2aTtO9gVg0F6Ie2jMAKxgcujTsYcfr8QDBq1oRhMv02fjma8ZQ+Ly5sGMKkgk48L0j3mk62gkH0WE+FDTIm0Poj08sKg90r94o8l5xIGacgmPgVm47jHZkZEx6PakkCbGfwqnQ5znMxkLBM6/538JwCYiVNkdW9cXkrOk/ZX5jVyXM4ErmMRd1p0qlg8uRTPZdpCQvohrqrcjSTombW8Z/tP+gD8Pcvu11aBweJ7clsJmPjQo0V0AlLG+9p+iQ1HlSNgc0PNmf36T7viVmZNEhm37wKLFjZRksbhUWnd8KnqOvoST4D5vZBZJ+iNpyxTlt1u2C06FRcDnwvCBaH7RmQXVaTZ+dWp9iQaLwceKJQe00xV4gGU7X4SalEIyjUniihX1cYARr4QjNPLvh1/S5BCf1Uc4O1RRAuC9EaFyq4isLmBpNtJ9YWJCjNi9HhUThhFbedmG0IsrKYBxBnYwfNgTSMuCGIXKuWNcU217R+LjaUPl+ZaNWi1ERnLTEe+miMS4/MVBOdhe2NXhTEKL1rjit9JnmOyohgtjpCxxo96uoPMd14au9u1RKMaLl3Ngx0X3bmzrQE27JZG8LB0TItr5C9Gma2WZva9ruuIK96zFNpH3q+jd6mDQ4hUahklWhw+FutJ9ny/CV1TtPC6bMpNNau9RuCgrOSa9fKvLT/4EWTbaS7t05bP+q8TmOJKj/ffPq32oLvLemktU2k1rB9739zC1q8U2qlz5zOL37RVC85+KnrJ37rYpAvvrJF3KBIDPNTl+l85zVHkzHiKZh9+20v2gsXUP3W1WC/dWnbb12n902b58sXHf7WFZS/dTnod1zbCsk617Yy/dCFuvufuup4/1uXUPMy23Wy9tQFSSybSykLs9/nW13c3s0/mzLMvqAb2DaAKtQhK8Dsk/rT6wAmM2VPy2H2VhB9dHBAJNuQbgHM3jjEr+VTqgii+KkAZU0YPjiS3XxeFkFqw7IAZq+79BPZT9CmskXDL8AwVae3zxx0l+DzThjuTr/zrANiMOnqrwyzd+vdu3AgjnKVpqevw+z3YR69Y9fBJM0XtyFfDLM3/C5de2XDiGaH5U2hlsP0ZRb0pYtwHkQQbcNX+lu9AsPzm3mZ0iqTByJQViq2y+owe36xQrabb90/Oyha1B4WTvsVYXhToqbUXimzIJpWNs4KBWArwPT3FFXU1pa4b5Bodlwt7OH+qFVguHTDz6FiD3RM0C6f7wQsrX9csd/TIjiVGgAAAABJRU5ErkJggg=="
                            size="xs" />
                    </template>
                </UButton>
                <UButton label="Youtube" color="red" variant="ghost" @click="search('youtube', name)">
                    <template #leading>
                        <UAvatar
                            src="https://static.vecteezy.com/system/resources/thumbnails/023/986/480/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
                            size="sm" />
                    </template>
                </UButton>
                <UButton label="Apple Music" color="pink" variant="ghost" @click="search('apple', name)">
                    <template #leading>
                        <UAvatar
                            src="https://w7.pngwing.com/pngs/772/159/png-transparent-itunes-store-apple-music-apple-purple-computer-os-x-thumbnail.png"
                            size="xs" />
                    </template>
                </UButton>

            </div>

            <template #footer>
                <h1>Spotify link</h1>
                <div class="flex items-center gap-2 mt-1">
                    <UInput class="flex grow" :value="url" readonly />
                    <UButton label="Copy" @click="copy" color="blue" />
                </div>
                <Placeholder class="h-8" />
            </template>
        </UCard>
    </UModal>
</template>
