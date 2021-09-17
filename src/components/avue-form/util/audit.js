import store from '@/store'
import _ from 'lodash'
export function auditDataMaker(form,auditLog,path) {
  let func = store.getters.func_paths
  let auditObj={}
  let result=_.cloneDeep(form)
  func.some((item)=>{
    if(item.path===path){
      auditObj.functionName=item.functionName
      auditObj.functionId=item.functionId
      auditObj.functionCode=item.functionCode
      auditObj.url=path
      return true
    }
  })
  auditObj.auditLog=auditLog
  result.auditObj=auditObj
  console.log('result:',result)
  return result
}
