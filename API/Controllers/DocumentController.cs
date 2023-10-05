using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DocumentController : BaseApiController
    {
        private readonly DocfinderContext _context;
        public DocumentController(DocfinderContext context)
        {
            _context = context;
        }

        [HttpGet("documents")]
        public async Task<ActionResult<Document>> GetDocuments()
        {
            return Ok(await _context.Documents.ToListAsync());
        }

        [HttpPost("add-document")]
        public async Task<ActionResult<DocumentDto>> AddDocument(DocumentDto documentDto)
        {
            var newDoc = new Document
            {
                Owner = documentDto.Owner,
                DocumentType = documentDto.DocumentType,
                PlaceFound = documentDto.PlaceFound,
            };

            _context.Documents.Add(newDoc);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("document/{id}")]
        public async Task<ActionResult> GetDocument(Guid id)
        {
            var doc = await _context.Documents.FirstOrDefaultAsync(d => d.Id == id);

            if (doc == null) return NotFound();

            return Ok(doc);
        }

        [HttpPut("update-document/{id}")]
        public async Task<ActionResult<UpdateDocumentDto>> UpdateDoc(Guid id, UpdateDocumentDto request)
        {
            var document = await _context.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if (document == null) return NotFound();

            document.Owner = request.Owner;
            document.PlaceFound = request.PlaceFound;
            document.DocumentType = request.DocumentType;
            document.IsFound = request.IsFound;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("delete-document/{id}")]
        public async Task<ActionResult> DeleteDocument(Guid id)
        {
            var doc = await _context.Documents.FirstOrDefaultAsync(d => d.Id == id);

            if (doc == null) return NotFound();

            _context.Documents.Remove(doc);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}