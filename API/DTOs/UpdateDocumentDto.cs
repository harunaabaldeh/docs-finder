using API.Enums;

namespace API.DTOs
{
    public class UpdateDocumentDto
    {
        public string Owner { get; set; }
        public string PlaceFound { get; set; }
        public DocumentType DocumentType { get; set; }
        public bool IsFound { get; set; } = false;
    }
}