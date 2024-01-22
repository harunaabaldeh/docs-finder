using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DocumentsController : BaseApiController
    {
        private readonly DocfinderContext _context;
        private readonly ICurrentUserService _currentUserService;
        public DocumentsController(DocfinderContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }
        
        [HttpGet]
        public async Task<IResult> GetDocuments()
        {
            var userId = _currentUserService.GetUserId();
            
            var documents = await _context.Documents.Where(d => !d.IsFound)
                .OrderByDescending(d => d.DateFound)
                .ToListAsync();

            return Results.Ok(documents);
        }
        
        [HttpPost]
        public async Task<IResult> AddDocument(DocumentDto documentDto)
        {
            var newDocument = new Document
            {
                Owner = documentDto.Owner,
                DocumentType = documentDto.DocumentType,
                PlaceFound = documentDto.PlaceFound,
                DateFound = DateTime.UtcNow
            };

            _context.Documents.Add(newDocument);

            await _context.SaveChangesAsync();

            return Results.Ok(newDocument);
        }

        [HttpGet("{id:guid}")]
        public async Task<IResult> GetDocument(Guid id)
        {
            var doc = await _context.Documents.FirstOrDefaultAsync(d => d.Id == id);

            if (doc is null) return Results.NotFound();

            return Results.Ok(doc);
        }

        [HttpPut("{id:guid}")]
        public async Task<IResult> UpdateDoc(Guid id, UpdateDocumentDto request)
        {
            var document = await _context.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if (document == null) return Results.NotFound();

            document.Owner = request.Owner;
            document.PlaceFound = request.PlaceFound;
            document.DocumentType = request.DocumentType;
            document.IsFound = request.IsFound;

            await _context.SaveChangesAsync();

            return Results.Ok(document);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IResult> DeleteDocument(Guid id)
        {
            var doc = await _context.Documents.FirstOrDefaultAsync(d => d.Id == id);

            if (doc == null) return Results.NotFound();

            _context.Documents.Remove(doc);

            await _context.SaveChangesAsync();

            return Results.NoContent();
        }

        [HttpPut("status/{id}")]
        public async Task<IResult> UpdateDocumentStatus(Guid id)
        {
            var document = await _context.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if (document is null)
                return Results.NotFound();

            document.IsFound = true;

            await _context.SaveChangesAsync();
            
            return Results.Ok(document);
        }

    }
}