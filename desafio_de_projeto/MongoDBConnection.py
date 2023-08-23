import os
from bson import ObjectId
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi import HTTPException


load_dotenv()
MONGODB_URI = os.environ.get("MONGODB_URI")
COLLECTION_NAME = os.environ.get("COLLECTION_NAME")
DB_NAME = os.environ.get("DB_NAME")


class Database:
    def __init__(self):
        self._client = MongoClient(MONGODB_URI)
        self._db = self._client[DB_NAME]
        self._collection = self._db[COLLECTION_NAME]
        self._collection_name = str(self._collection.name)

    def get_db_name(self):
        return str(self._db.name)

    def get_collection_name(self):
        return self._collection_name

    def get_collections(self):
        return {'Collections': self._db.list_collection_names()}

    def get_all_documents(self):
        return list(self._collection.find())

    def get_count_documents(self):
        total = list(self._collection.find({}))
        return len(total)

    def get_db_info(self):
        return {"Database": self.get_db_name(),
                "Collection": self.get_collection_name(),
                "Number of docs": self.get_count_documents()}

    def set_new_collection(self, str_collection: str):
        try:
            self._collection = self._db[str_collection]
        except Exception as err:
            return HTTPException(status_code=404, detail={"Message error": err})

        self._collection_name = str(self._collection.name)
        return self.get_db_info()

    # CRUD - Documentos -> Coleções
    def create_document(self, doc: dict) -> ObjectId:
        inserted_id = self._collection.insert_one(document=doc)
        return inserted_id

    def read_document(self, id_doc: str) -> dict:
        return self._collection.find_one({"_id": ObjectId(id_doc)})

    def update_document(self, id_doc: str, new_doc: dict) -> int:
        """
            :param id_doc: ObjectId do documento a ser modificado
            :param new_doc: O novo documento a ser inserido
            :return: O número de documentos modificados
        """
        updated_document = self._collection.update_one(
            {"_id": ObjectId(id_doc)},
            {"$set": dict(new_doc)}
        )

        return 1 if updated_document else 0

    def delete_document(self, id_doc: str) -> int:
        result = self._collection.delete_one({"_id": ObjectId(id_doc)})
        return result.deleted_count



