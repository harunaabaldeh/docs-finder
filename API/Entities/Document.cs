using API.Enums;

namespace API.Entities
{
    public class Document
    {
        public Guid Id { get; set; }
        public string Owner { get; set; }
        public string PlaceFound { get; set; }
        public DocumentType DocumentType { get; set; }
        public DateTime DateFound { get; set; }
        public bool IsFound { get; set; } = false;

    }
}