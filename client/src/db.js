import PouchDB from 'pouchdb'
import pouchFind from 'pouchdb-find'
import angular from 'angular'
import './vendor/angular-pouchdb'
window.PouchDB = PouchDB.plugin(pouchFind)

angular.module('app.db',['pouchdb'])

.factory('$db', function(pouchDB){
  return pouchDB('cf_dev')
})
.run(function($db){
  $db.createIndex({index: {fields: ['doc_type']} })
  .then(()=> console.log('Indice Creado') )
  .catch((err) => console.log(`Hubo un error al crear el indice doc_type: \n ${err}`) )
})
