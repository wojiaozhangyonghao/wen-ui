export function export2Excel(columns,list,excelName){
    require.ensure([], () => {
        const { export_json_to_excel } = require('../vendor/Export2Excel');
        let tHeader = []
        let filterVal = []
        columns.forEach(item =>{
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, excelName);
    })
  }