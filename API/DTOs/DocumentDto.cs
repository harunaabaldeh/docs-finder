using API.Enums;

namespace API.DTOs
{
    public class DocumentDto
    {
        public string Owner { get; set; }
        public string PlaceFound { get; set; }
        public DocumentType DocumentType { get; set; }
    }

}