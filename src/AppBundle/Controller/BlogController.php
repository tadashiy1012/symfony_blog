<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Blog;

/**
 * @Route("/blog")
 */
class BlogController extends Controller {
  /**
   * @Route("/", name="blog_index")
   * @Method("GET")
   */
  public function indexAction(Request $req) {
    $repo = $this->getDoctrine()->getRepository(Blog::class);
    $blogs = $repo->findAll();
    return new Response(json_encode($blogs, true));
  }
  /**
   * @Route("/{id}", name="blog_getone")
   * @Method("GET")
   */
  public function getOneAction(Request $req, $id) {
    $repo = $this->getDoctrine()->getRepository(Blog::class);
    $blog = $repo->find($id);
    return new Response(json_encode($blog, true));
  }
  /**
   * @Route("/create", name="blog_create")
   * @Method("POST")
   */
  public function createAction(Request $req) {
    $content = json_decode($req->getContent(), true);
    $blog = new Blog();
    $blog->setTitle($content['title']);
    $blog->setBody($content['body']);
    $blog->setDate(new \DateTime());
    $em = $this->getDoctrine()->getManager();
    $em->persist($blog);
    $em->flush();
    return new Response(json_encode(['result' => 'ok'], true));
  }
}