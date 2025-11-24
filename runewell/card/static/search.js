function pageNavigate(page){
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page);
    window.location.search = searchParams.toString();
}

function updateSortOrder(e){
    const sortOrder = e.target.value;
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("order", sortOrder);
    window.location.search = searchParams.toString();
}

function updateSortDir(e){
    const sortDir = e.target.value;
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("dir", sortDir);
    window.location.search = searchParams.toString();
}

function setUpSelectorChangeHandler(id, searchParamName, changeHandler){
    const sortSelector = document.getElementById(id);
    const param = new URLSearchParams(location.search);
    const searchParamValue = param.get(searchParamName);
    sortSelector.value = searchParamValue || sortSelector.options[0].value;
    sortSelector.addEventListener("change", changeHandler);
}

function startUp(){
    setUpSelectorChangeHandler("order_id_header", "order", updateSortOrder);
    setUpSelectorChangeHandler("dir_id_header", "dir", updateSortDir);
    setUpSelectorChangeHandler("order_id_footer", "order", updateSortOrder);
    setUpSelectorChangeHandler("dir_id_footer", "dir", updateSortDir);
}

document.addEventListener("DOMContentLoaded", startUp);