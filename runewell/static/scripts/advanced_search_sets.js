document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("set-select")
    const input = document.getElementById("setSearch")
    const options = document.getElementById("setOptions")
    const selectedContainer = document.getElementById("selectedSets")

    const selectedSets = new Set()

    input.addEventListener("focus", () => {
        options.style.display = "block"
    })

    document.addEventListener("click", (e)=>{
        if(!container.contains(e.target)){
            options.style.display="none"
        }
    })

    document.querySelectorAll(".set-option").forEach(option => {

        option.onclick = () => {

            const value = option.dataset.value

            if(selectedSets.has(value)) return

            option.classList.add("selected")

            selectedSets.add(value)

            const tag = document.createElement("div")
            tag.className = "set-tag"

            tag.innerHTML = `
                ${value}
                <button type="button">×</button>
                <input type="hidden" name="set" value="${value}">
            `

            tag.querySelector("button").onclick = () => {
                selectedSets.delete(value)
                tag.remove()

                const option = document.querySelector(`.set-option[data-value="${value}"]`)
                if(option){
                    option.classList.remove("selected")
                }
            }

            selectedContainer.appendChild(tag)

            input.value = ""
            options.style.display = "none"
        }

    })

})