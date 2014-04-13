angular.module("archiveApp").factory "Archive", ($http, $q, db) ->
  archiveSearchUrl = "https://archive.org/advancedsearch.php"
  archiveShowUrl = "https://archive.org/details/"
  requestIndex = ->
    d = $q.defer()
    db.get("idx").then ((doc) ->
      d.resolve doc.data
      return
    ), ->
      $http.get("index.json").success (data) ->
        d.resolve data
        db.put
          _id: "idx"
          data: data
    d.promise

  requestList = (collection) ->
    d = $q.defer()
    db.get(collection).then ((doc) ->
      d.resolve doc.data
    ), ->
      $http(
        method: "JSONP"
        url: archiveSearchUrl
        params:
          q: "collection:\"#{collection}\""
          "fl[]": [
            "avg_rating"
            "date"
            "downloads"
            "description"
            "identifier"
            "year"
            "title"
          ]
          "sort[]": [
            "date desc"
            ""
            ""
          ]
          rows: "10000"
          page: "1"
          indent: "yes"
          output: "json"
          callback: "JSON_CALLBACK"
          save: "yes"
      ).success((data) ->
        d.resolve data
        db.put
          _id: collection
          data: data
      ).error (message) ->
        d.reject message

    d.promise

  requestShow = (id) ->
    d = $q.defer()
    db.get(id).then ((doc) ->

      d.resolve doc.data
    ), ->
      $http(
        method: "JSONP"
        url: archiveShowUrl + id
        params:
          output: "json"
          callback: "JSON_CALLBACK"
      ).success (data) ->
        d.resolve data
        db.put
          _id: id
          data: data

    d.promise

  update = (id) ->
    db.get(id).then( (doc) ->
      db.remove(doc)
    )

  getIndex: ->
    requestIndex()

  getList: (collection) ->
    requestList collection

  getShow: (id) ->
    requestShow id

  update: (id) ->
    update id
