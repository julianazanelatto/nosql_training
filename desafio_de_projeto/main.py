from bson import ObjectId
from fastapi import FastAPI, HTTPException
from MongoDBConnection import Database

app = FastAPI()
mongodb = Database()

# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    @app.get("/")
    async def read_root():
        return {
            "message": "Welcome to the MongoDB API",
            "endpoints": {
                "Database Information": "http://127.0.0.1:8000/db_info",
                "List of collections": "http://127.0.0.1:8000/list_collections",
                "Set new collection name": "/new_collection/{collection_name}",
                "List of current collection docs": "http://127.0.0.1:8000/collections/all",
                "Read Document": "http://127.0.0.1:8000/collection/{document_id}",
                "Create Document": "http://127.0.0.1:8000/collection/",
                "Update Document": "http://127.0.0.1:8000/collection/{document_id}",
                "Delete Document": "http://127.0.0.1:8000/collection_delete/{document_id}",
            }
        }

    @app.get("/db_info")
    async def get_db_info():
        return mongodb.get_db_info()

    @app.get("/new_collection/{collection_name}")
    async def set_new_collection(collection_name: str):
        return mongodb.set_new_collection(collection_name)

    @app.get("/list_collections")
    async def get_all_collections():
        if mongodb is not None:
            return {f"Lista de Coleções do banco {mongodb.get_db_name()}": mongodb.get_collections()}
        return HTTPException(status_code=404, detail="Empty database")

    @app.get("/collections/all")
    async def get_all_docs():
        list_of_docs = []
        for doc in mongodb.get_all_documents():
            doc['_id'] = str(ObjectId(doc['_id']))
            list_of_docs.append(doc)
        return {"All docs": list_of_docs}

    # Define API routes for collection operations
    @app.get("/collection/{document_id}")
    async def get_document(document_id: str):
        document = mongodb.read_document(document_id)
        if document:
            document['_id'] = str(ObjectId(document['_id']))
            return document
        else:
            raise HTTPException(status_code=404, detail="Document not found")


    @app.post("/collection/")
    async def create_document(document: dict):
        try:
            inserted_id = mongodb.create_document(document)
        except Exception:
            raise HTTPException(status_code=404, detail="Document not found")
        return {"message": "Document created", "inserted_id": str(inserted_id)}


    @app.put("/collection/{document_id}")
    async def update_document(document_id: str, updated_document: dict):
        result = mongodb.update_document(document_id, updated_document)
        message = {"message": "Document updated"} if result > 0 else {"message": "Document not found"}
        return message

    @app.delete("/collection_delete/{document_id}")
    async def delete_document(document_id: str):
        result = mongodb.delete_document(document_id.strip())
        if result == 0:
            raise HTTPException(status_code=404, detail="Documento não encontrado")
        return {"message": "Documento deletado com sucesso"}

    import uvicorn
    uvicorn.run(app=app, host="127.0.0.1", port=8000)

